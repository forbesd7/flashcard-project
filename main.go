package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var serverPort = ":" + os.Getenv("PORT")
var client *mongo.Client

func main() {

	ctx, _ := context.WithTimeout(context.Background(), 240*time.Second)
	clientOptions := options.Client().ApplyURI("mongodb+srv://derek:ajninsword@cluster0-swqnm.mongodb.net/test?retryWrites=true&w=majority")
	client, _ = mongo.Connect(ctx, clientOptions)

	defer client.Disconnect(ctx)

	// quickstartDatabase := client.Database("quickstart")
	// podcastsCollection := quickstartDatabase.Collection("podcasts")
	// episodesCollection := quickstartDatabase.Collection("episodes")

	// podcastResult, err := podcastsCollection.InsertOne(ctx, bson.D{
	// 	{"title", "The Polyglot Developer Podcast"},
	// 	{"author", "Nic Raboy"},
	// })
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Printf("inserted %v", podcastResult)
	// episodeResult, err := episodesCollection.InsertMany(ctx, []interface{}{
	// 	bson.D{
	// 		{"podcast", podcastResult.InsertedID},
	// 		{"title", "GraphQL for API Development"},
	// 		{"description", "Learn about GraphQL from the co-creator of GraphQL, Lee Byron."},
	// 		{"duration", 25},
	// 	},
	// 	bson.D{
	// 		{"podcast", podcastResult.InsertedID},
	// 		{"title", "Progressive Web Application Development"},
	// 		{"description", "Learn about PWA development with Tara Manicsic."},
	// 		{"duration", 32},
	// 	},
	// })
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Printf("Insereted %v documents into episode collection!\n", len(episodeResult.InsertedIDs))

	// cursor, err := episodesCollection.Find(ctx, bson.M{})
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer cursor.Close(ctx)

	// for cursor.Next(ctx) {
	// 	var episode bson.M
	// 	if err = cursor.Decode(&episode); err != nil {
	// 		log.Fatal(err)
	// 	}
	// 	fmt.Println(episode)
	// }

	// filterCursor, err := episodesCollection.Find(ctx, bson.M{"duration": 25})
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// var episodesFiltered []bson.M
	// if err = filterCursor.All(ctx, &episodesFiltered); err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println(episodesFiltered)
	// fmt.Println("filtered eps")

	fs := http.FileServer(http.Dir("./client/build"))
	http.Handle("/", fs)
	staticHandler := http.StripPrefix("/static/", http.FileServer(http.Dir("./client/build/static")))
	http.Handle("/static", staticHandler)
	//router.PathPrefix("/static/").Handler(staticHandler)

	http.HandleFunc("/api/add", addCard)
	http.HandleFunc("/api/decks", getAllDecks)
	http.HandleFunc("/api/makeDeck", addDeck)
	http.HandleFunc("/api/deleteDeck", deleteDeck)
	//http.HandleFunc("/api/getCards", getCards)

	log.Println("Listening...")
	if serverPort == ":" {
		serverPort = ":8080"
	}
	log.Fatal(http.ListenAndServe(serverPort, nil))

}

type Test struct {
	Name string
}

type Deck struct {
	DeckName string
}

func addCard(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	//log.Println(string(body))
	//fmt.Fprintf(w, "%v", string(body))

	var t Test
	err = json.Unmarshal(body, &t)
	if err != nil {
		panic(err)
	}
	//log.Println(t.Name)
}

func getAllDecks(w http.ResponseWriter, r *http.Request) {
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Fprintf(w, "%v", databases)
}

func addDeck(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}
	//fmt.Fprintf(w, "%v", string(body))
	var deck Deck
	err = json.Unmarshal(body, &deck)
	fmt.Printf("%v", deck)

	newDatabase := client.Database(deck.DeckName)
	newCollection := newDatabase.Collection(deck.DeckName)

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	newResult, err := newCollection.InsertOne(ctx, bson.D{
		{"test", "test"},
		{"test2", "test2"},
	})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("inserted %v", newResult)
}

func deleteDeck(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}

	var deck Deck
	err = json.Unmarshal(body, &deck)
	fmt.Printf("%v", deck)

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

	toBeDeletedDatabase := client.Database(deck.DeckName)
	toBeDeletedDatabase.Drop(ctx)

}

//func getCards(w http.ResponseWriter, r *http.Request)
