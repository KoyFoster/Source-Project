// Stock Market API Key: YBvz1ufoloacGPqJkwNaptQfYOJXTgOF
import { iex } from '../config/iex';

export const stock = {
  url: (ticker) =>
    `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`,
  // Call API
  latestPrice: (stockTag, setData, justLast = true) => {
    fetch(stock.url(stockTag))
      .then((response) => {
        return response.json();
      })
      .then((d) => {
        // console.log("fetched data:", d[d.length - 1]);
        setData(justLast ? d[d.length - 1] : d);
      });
  },
};

export default stock;
