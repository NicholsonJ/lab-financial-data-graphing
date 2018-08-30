var ctx = document.getElementById('myChart').getContext('2d');
const bitcoin = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
});

bitcoin
  .get('')
  .then(function(response) {
    printTheChart(response.data.bpi);
  })
  .catch(function(error) {
    console.log(error);
  });

let printTheChart = bitcoinPrice => {
  let coinDate = Object.keys(bitcoinPrice);
  let coinPrice = Object.values(bitcoinPrice);
  let sortedArray = coinPrice.map((a, b) => a - b);
  let max = sortedArray[0];
  let min = sortedArray[sortedArray.length - 1];
  $(`.minmax`).html(`<h2>min: ${min}</h2><br><h2>max: ${max}</h2>`);
  console.log('min:', min);
  console.log('max', max);
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: coinDate,
      datasets: [
        {
          label: 'Bitcoin chart',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: coinPrice
        }
      ]
    }
  });
};

let historicalData = $('.submit').click(e => {
  e.preventDefault();
  let firstDate = $('.firstDate').val();
  let secondDate = $('.secondDate').val();
  let currency = $('.currency').val();
  historicalChart(firstDate, secondDate, currency);
});

function historicalChart(firstDate, secondDate, currency) {
  axios
    .get(
      'https://api.coindesk.com/v1/bpi/historical/close.json?currency=' +
        currency +
        '&start=' +
        firstDate +
        '&end=' +
        secondDate
    )
    .then(function(response) {
      printTheChart(response.data.bpi);
      console.log(currency);
    })
    .catch(function(error) {
      console.log(error);
    });
}
