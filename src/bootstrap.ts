import $ from 'jquery'

try {
  window.$ = window.jQuery = $
} catch (err) {
  console.error(err)
}
