// Exercise 4: Belongs to association
import { Server, Model, RestSerializer, belongsTo } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: { application: RestSerializer },

    models: {
      user: Model,
      message: Model.extend({
        user: belongsTo(),
      }),
    },

    seeds(server) {
      let sam = server.create("user", { name: "Sam" });
      let Ryan = server.create("user", { name: "Ryan" });

      server.create("message", { text: "Hey!", user: Ryan });
      server.create("message", { text: "yo man whats up", user: sam });

      server.create("message", { text: "hey man", user: sam });
      server.create("message", {
        text: "hows #coronaconf2020 going?",
        user: sam,
      });
      server.create("message", {
        text: "I managed to buy groceries but somehow all I'm eating is candy",
        user: Ryan,
      });
    },

    routes() {
      this.resource("user");
      this.resource("message");
    },
  });
}
