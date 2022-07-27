


export default function crypt(key, buf, encrypt=true){
  const max = encrypt ? 86 : 128
  const length = buf.byteLength
  let cursor = 0
  const bufs = []
  while (length - cursor > 0) {
    let size = length - cursor
    if (encrypt) bufs.push(crypto.privateEncrypt(key, buf.slice(cursor, size > max? cursor + max: length)))
    else bufs.push(crypto.publicDecrypt(key, buf.slice(cursor, size > max? cursor + max: length)))
    cursor = cursor + max
  }
  return Buffer.concat(bufs)
}
