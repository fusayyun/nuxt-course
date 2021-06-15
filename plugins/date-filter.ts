import Vue from 'vue'

const months: string[] = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'June',
  'July',
  'Aug.',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dec.'
]

const dateFilter = (value: Date) => formatDate(value)

function formatDate (inputDate: Date): string {
  const date: Date = new Date(inputDate)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const formattedDate = months[month] + ' ' + day + ' ' + year
  return formattedDate
}

// https://vuejs.org/v2/guide/filters.html
Vue.filter('date', dateFilter)
