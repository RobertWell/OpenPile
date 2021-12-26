// Exercise 14: Practice with many to many joins
import { Server, Model, JSONAPISerializer, hasMany, belongsTo } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: { application: JSONAPISerializer },

    models: {
      user: Model.extend({
        messages: hasMany(),
        // friends: hasMany("user"),
        friendship: hasMany({inverse:'from'}),  //inverse: 只記錄from id
      }),

      message: Model.extend({
        user: belongsTo(),
      }),

      friendship: Model.extend({
        from: belongsTo("user"),
        to: belongsTo("user"),
      }),
    },

    seeds(server) {
      let sam = server.create("user", { name: "Sam" });
      let ryan = server.create("user", { name: "Ryan" });
      let yehuda = server.create("user", { name: "yehuda" });
      let tom = server.create("user", { name: "tom" });
      // sam.update({ friends: [yehuda, tom] });

      server.create("friendship", { from: sam, to: ryan });
      server.create("friendship", { from: sam, to: yehuda });
      server.create("friendship", { from: sam, to: tom });
      
      sam.createMessage({ text: "hey!" });
      ryan.createMessage({ text: "hey man" });
      ryan.createMessage({ text: "hows #coronaconf2020 going?" });
      sam.createMessage({
        text: "I managed to buy groceries but somehow all I'm eating is candy",
      });
    },

    routes() {
      this.resource("user");
      this.resource("message");
      this.resource("friendship");
    },
  });
}
