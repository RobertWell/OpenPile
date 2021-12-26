// Exercise 6: Has many association
import { Server, Model, RestSerializer, hasMany, belongsTo } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: { application: RestSerializer },

    models: {
      user: Model.extend({
        message:hasMany()
      }),
      message: Model.extend({
        user: belongsTo()
      }),
    },

    seeds(server) {
      let Sam = server.create("user", { name: "Sam" });
      let Ryan = server.create("user", { name: "Ryan" });

      let m1 = server.create("message", { text: "hey!" });
      let m2 = server.create("message", { text: "hey man" });
      let m3 = server.create("message", {
        text: "hows #coronaconf2020 going?"
      });
      let m4 = server.create("message", {
        text: "I managed to buy groceries but somehow all I'm eating is candy"
      });

      Sam.update({message:[m1, m2]})
      Ryan.update({message:[m3,m4]})
    },

    routes() {
      this.resource("user");
      this.resource("message");
    }
  });
}
