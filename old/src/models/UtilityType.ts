/**
 * Pで指定した型と一致するキーをUNION型で返す
 */
export type PicKey<T, P> = {
  [K in keyof T]: T[K] extends P ? K : never;
}[keyof T];
