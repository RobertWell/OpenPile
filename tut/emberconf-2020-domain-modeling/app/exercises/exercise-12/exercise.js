// Exercise 12: Many to many
import { Server, Model, JSONAPISerializer, hasMany, belongsTo } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: { application: JSONAPISerializer },

    models: {
      user: Model.extend({
        messages: hasMany(),
        channels:hasMany(),
        
      }),

      message: Model.extend({
        user: belongsTo()
      }),

      channel: Model.extend({
        users:hasMany()
        //
      })
    },

    seeds(server) {
      let sam = server.create("user", { name: "Sam" });
      let ryan = server.create("user", { name: "Ryan" });

      sam.createMessage({ text: "hey!" });
      ryan.createMessage({ text: "hey man" });
      ryan.createMessage({ text: "hows #coronaconf2020 going?" });
      sam.createMessage({
        text: "I managed to buy groceries but somehow all I'm eating is candy"
      });

      let general = server.create("channel", { name: "general", users:[sam, ryan] });
      let video = server.create("channel", { name: "video" , users:[ ryan]});
      let podcast = server.create("channel", { name: "podcast", users:[sam] });
    },

    routes() {
      this.resource("user");
      this.resource("message");
      this.resource("channel");
    }
  });
}
