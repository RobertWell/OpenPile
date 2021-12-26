import { belongsTo, createServer, hasMany, Model } from "miragejs";

export default function () {
  return createServer({
    models: {
      movie: Model.extend({
        actors: hasMany(),
      }),

      actor: Model.extend({
        movie: belongsTo(),
      }),
    },
    seeds(server) {
      const actor1 = server.create("actor", { name: "Mathhew McConaughey" });
      const actor2 = server.create("actor", { name: "Anne Hathaway" });
      const actor3 = server.create("actor", { name: "Jessica Chastain" });
      const actor4 = server.create("actor", { name: "Leonardo Dicarpio" });
      const actor5 = server.create("actor", { name: "Tom Hardy" });
      const actor6 = server.create("actor", { name: "Mathhew McConaughey" });
      server.create("movie", {
        name: "Inception",
        year: 2010,
        actors: [actor1, actor2],
      });
      server.create("movie", {
        name: "Instellar",
        year: 2014,
        actors: [actor3, actor4],
      });
      server.create("movie", {
        name: "Dunkirk",
        year: 2017,
        actors: [actor5, actor6],
      });
    },
    routes() {
      this.namespace = "api"; //appending of routest
      // like: /api/movies here
      this.get("/movies", (schema) => schema.movies.all());

      this.post("/movies", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        // console.log('-------attrs', attrs);

        schema.movies.create(attrs);
        return schema.movies.all();
      });

      this.delete("/movies/:id", (schema, request) => {
        let id = request.params.id;
        let movie = schema.movies.find(id);
        movie.destroy();

        return schema.movies.all();
      });
    },
  });
}
