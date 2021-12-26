// Exercise 7: One to many
import { Server, Model, RestSerializer, belongsTo, hasMany } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: { application: RestSerializer },

    models: {
      user: Model.extend({
        messages:hasMany()
      }),
      message: Model.extend({
        user:belongsTo()
      })
    },

    seeds(server) {
      let sam = server.create("user", { name: "Sam" });
      let Ryan = server.create("user", { name: "Ryan" });

      server.create("message", { text: "hey!", user:Ryan });
      server.create("message", { text: "hey man" , user:sam});
      server.create("message", {
        text: "hows #coronaconf2020 going?", user:Ryan
      });
      server.create("message", {
        text: "I managed to buy groceries but somehow all I'm eating is candy", user:sam
      });
    },

    routes() {
      this.resource("user");
      this.resource("message");
    }
  });
}
