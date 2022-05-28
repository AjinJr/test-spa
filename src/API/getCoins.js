export const getInfo = payload => {
    return fetch(`https://min-api.cryptocompare.com/data/price?fsym=${payload.from}&tsyms=${payload.to}&api_key=339fc8c0f96cb3a3b548f7c3bea4c7e35eda66a5bb026d8c81b65eff2ffe2e07`)
    .then((response) =>{
      return response.json()
    })
}

export const getHist = (a, b, c) => {
  return fetch(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${a}&tsyms=${b}&ts=${c}&api_key=339fc8c0f96cb3a3b548f7c3bea4c7e35eda66a5bb026d8c81b65eff2ffe2e07`)
  .then((response) =>{
  return response.json()
})
}