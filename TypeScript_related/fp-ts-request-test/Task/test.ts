import * as T from 'fp-ts/Task'
import { pipe, flow } from 'fp-ts/lib/function'
import axios from 'axios'

const getHello: T.Task<string> = () => new Promise((resolve) => {
  resolve('hello')
})

// Promise.resolve(foo) is the same as new Promise(resolve => resolve(foo))
// const getHello = () => Promise.resolve('hello')
console.log(getHello())

const addAtEnd = (b: string) => (a: string): string => a + b

const getHelloAndAddWorld = pipe(
    getHello,
    T.map(d=>addAtEnd(' world')(d))
  )
  

  