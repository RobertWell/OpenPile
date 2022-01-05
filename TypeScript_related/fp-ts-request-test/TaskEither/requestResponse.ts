import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import * as T from "fp-ts/lib/Task";
import axios from "axios";
// import { Do } from "fp-ts/lib/TaskEither";
import { Do } from "fp-ts-contrib/lib/Do";

import { User } from "../tut/types";
import { pipe, flow } from "fp-ts/lib/function";

// ℹ️ traditional single fetch
export const fetchUsers = () =>
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    // .then((response) => response.json())
    .then((response) => console.log(response.data))
    .catch((err) => console.error(err));

// ℹ️ traditional chained network request
export const sequentialRequestChain = () =>
  axios
    .get(`https://jsonplaceholder.typicode.com/users`)
    .then((response1) => response1.data)
    .then((users) => {
      console.log(`fetched all users`, users);
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${users[0].id}`)
        .then((response2) => response2.data)
        .then((singleUser) => {
          console.log("fetched single user", singleUser);
          axios
            .get(
              `https://jsonplaceholder.typicode.com/posts?userId=${users[0].id}`
            )
            .then((response3) => response3.data)
            .then((postsByUserId) =>
              console.log("fetched post related to user", postsByUserId)
            );
        });
    })
    .catch((err) => console.error(err));

// // ℹ️ traditional async network request
export const sequentialRequestAsync = async () => {
  let allUsersInfo;

  try {
    const users = await axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((response1) => response1.data);

    allUsersInfo = users;
    console.log(`fetched all users`, users);
  } catch (error) {
    console.log("failed to fetch users");
  }

  if (allUsersInfo && allUsersInfo[0].id < 2) {
    try {
      const singleUser = await axios
        .get(`https://jsonplaceholder.typicode.com/users/${allUsersInfo[0].id}`)
        .then((response2) => response2.data);
      console.log("fetched single user", singleUser);
    } catch (error) {
      console.log("failed to fetch single user");
    }

    try {
      const postByUserId = await axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?userId=${allUsersInfo[0].id}`
        )
        .then((response3) => response3.data);
      console.log("fetched post related to user", postByUserId);
    } catch (error) {
      console.log("failed to fetch users post");
    }
  }
};

// ℹ️ generic lazy fetch
export const safeFetch = (
  url: string,
  errMessage: string
): TE.TaskEither<Error, Array<User>> =>
  TE.tryCatch(
    () => axios.get(url).then((res) => res.data),
    () => new Error(errMessage)
  );


  //麻煩點：因為用了safeFetch，吐了TaskEither，所以必須直接Pipe
  //否則若一般的fetch，吐response，可以用Flow先接好 (如tut.ts)

const doSequentialRequest = pipe(
  safeFetch(
    "https://jsonplaceholder.typicode.com/users",
    "failed to fetch users"
  ),
  TE.bindTo("allUsersInfo"),
  TE.bind("singleUserInfo", ({ allUsersInfo }) => {
    return allUsersInfo && allUsersInfo[0] && allUsersInfo[0].id < 2
      ? safeFetch(
          `https://jsonplaceholder.typicode.com/users/${allUsersInfo[0].id}`,
          "failed to fetch single user"
        )
      : TE.left(Error("Invalid allUsersInfo"));
  }),
  TE.bind("postByUserId", ({ allUsersInfo }) => {
    return safeFetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${allUsersInfo[0].id}`,
      "failed to fetch all post for a single user"
    );
  }),
  TE.map(({ allUsersInfo, singleUserInfo, postByUserId }) => ({
    allUsersInfo,
    singleUserInfo,
    postByUserId,
  }))
);


export const invokeDoSequentialRequest = () =>
  doSequentialRequest().then(E.fold(console.error, console.log));
