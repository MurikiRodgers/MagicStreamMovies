package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/MurikiRodgers/MagicStreamMovies/Server/MagicStreamMoviesServer/database"
	"github.com/MurikiRodgers/MagicStreamMovies/Server/MagicStreamMoviesServer/routes"
	"github.com/gin-contrib/cors"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

func main() {
	//This is the main function
	router := gin.Default()

	router.GET("/hello", func(c *gin.Context) {
		c.String(200, "Hello, MagicStreamMovies!")
	})
	var client *mongo.Client = database.Connect()
	if err := client.Ping(context.Background(), nil); err != nil {
		log.Fatalf("Failed to reach sERVER: %v", err)
	}

	defer func() {
		err := client.Disconnect(context.Background())
		if err != nil {
			log.Fatalf("Failed to disconnect from MongoDB:%v", err)
		}
	}()

	// Set up CORS middleware
	config := cors.Config{}
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "PATCH"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	config.ExposeHeaders = []string{"Content-Length"}
	config.MaxAge = 12 * time.Hour

	router.Use(cors.New(config))
	router.Use(gin.Logger())

	routes.SetupUnProtectedRoutes(router, client)
	routes.SetupProtectedRoutes(router, client)

	if err := router.Run(":8080"); err != nil {
		fmt.Println("Failed to start server:", err)
	}

}
