package main

import (
	"fmt"

	"github.com/gin-gonic/gin"


	"github.com/MurikiRodgers/MagicStreamMovies/Server/MagicStreamMoviesServer/routes"
	
)

func main() {
	//This is the main function
	router := gin.Default()

	router.GET("/hello", func(c *gin.Context) {
		c.String(200, "Hello, MagicStreamMovies!")
	})

	routes.SetupUnProtectedRoutes(router)
	routes.SetupProtectedRoutes(router)

	if err := router.Run(":8080"); err != nil {
		fmt.Println("Failed to start server:", err)
	}

}
