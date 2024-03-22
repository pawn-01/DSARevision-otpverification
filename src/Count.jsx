import { atom } from "recoil";

export const listcount = atom({
    key: "listcount",
    default: 0,
  });

  export const user = atom({
     key:"user",
     default:null
  })

  export const reload = atom({
   key:"reload",
   default:false
  })

  