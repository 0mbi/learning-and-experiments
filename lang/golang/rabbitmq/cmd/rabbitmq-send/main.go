package main

import (
	"log"

	"github.com/streadway/amqp"
	"github.com/spf13/viper"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}



func main() {
	viper.SetEnvPrefix("RabbitMQ")
	viper.SetDefault("URL", "amqp://guest:guest@localhost:5672/" )
	viper.SetDefault("Queue_Name", "hello" )
	viper.SetDefault("Queue_Durable", false )
	viper.SetDefault("Queue_AutoDelete", false )
	viper.SetDefault("Queue_Exclusive", false )
	viper.SetDefault("Queue_NoWait", false )
	viper.AutomaticEnv()
	url := viper.GetString("URL")
	conn, err := amqp.Dial(url)
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		viper.GetString("Queue_Name"),
		viper.GetBool("Queue_Durable"),
		viper.GetBool("Queue_AutoDelete"),
		viper.GetBool("Queue_Exlusive"),
		viper.GetBool("Queue_NoWait"),
		nil,     // arguments
	)
	failOnError(err, "Failed to declare a queue")

	body := "Hello World!"
	err = ch.Publish(
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(body),
		})
	log.Printf(" [x] Sent %s", body)
	failOnError(err, "Failed to publish a message")
}
