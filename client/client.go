package main

import (
	"bufio"
	"flag"
	"fmt"
	"os"

	"encoding/hex"
	"log"
	"sync"
	"time"

	"github.com/BurkeyLai/gotunnel/client/proto"
	"github.com/google/uuid"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

var client proto.BroadcastClient
var wait *sync.WaitGroup

func init() {
	wait = &sync.WaitGroup{}
}

func connect(user *proto.User) error {

	stream, err := client.CreateStream(context.Background(), &proto.Connect{
		User:    user,
		Active:  true,
		Channel: user.Channel,
	})
	fmt.Println("Client: CreateStream")
	if err != nil {
		return fmt.Errorf("connection failed: %v", err)
	}

	wait.Add(1)
	return receiveMessage(stream)
}

func receiveMessage(stream proto.Broadcast_CreateStreamClient) error {
	var receivemsgerror error

	go func(str proto.Broadcast_CreateStreamClient) {
		defer wait.Done()
		for {
			msg, err := str.Recv()
			if err != nil {
				receivemsgerror = fmt.Errorf("Error receiving message: %v", receivemsgerror)
				break
			}
			fmt.Printf("%s_%v : %s\n", msg.Channel.Name, msg.Id, msg.Content)
			//if msg.Content == "對方已經離開聊天室" {
			//	time.Sleep(1 * time.Millisecond)
			//	os.Exit(0)
			//}
		}
	}(stream)

	return receivemsgerror
}

func sendMessage(user *proto.User, timestamp time.Time) error {
	var sendmsgerror error

	go func() {
		defer wait.Done()

		scanner := bufio.NewScanner(os.Stdin)
		for scanner.Scan() {

			msg := &proto.Message{
				Id:        user.Id,
				Content:   scanner.Text(),
				Timestamp: timestamp.String(),
				Channel:   user.Channel,
			}

			_, sendmsgerror := client.BroadcastMessage(context.Background(), msg)
			if sendmsgerror != nil {
				fmt.Printf("Error Sending Message: %v", sendmsgerror)
				break
			}

			if scanner.Text() == "LEAVE" {
				os.Exit(0)
			}
		}

	}()

	return sendmsgerror
}

//func Begin() {
func main() {
	timestamp := time.Now()
	done := make(chan int)

	name := flag.String("N", "Anon", "The name of the user")
	chan_name := flag.String("C", "Normal", "The channel user join to chat")
	flag.Parse()

	id := uuid.New() //sha256.Sum256([]byte(timestamp.String() + *name + *chan_name))
	//chan_id := sha256.Sum256([]byte(timestamp.String() + *name + *chan_name))
	fmt.Println("user id: " + hex.EncodeToString(id[:]))

	channel := &proto.Channel{
		Name: *chan_name,
		//Id:   hex.EncodeToString(chan_id[:]),
	}

	conn, err := grpc.Dial("localhost:9090", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Couldn't connect to service: %v", err)
	}

	client = proto.NewBroadcastClient(conn)
	user := &proto.User{
		Id:      hex.EncodeToString(id[:]),
		Name:    *name,
		Channel: channel,
	}

	connect(user)

	wait.Add(1)
	sendMessage(user, timestamp)

	go func() {
		wait.Wait()
		close(done)
	}()

	<-done
}
