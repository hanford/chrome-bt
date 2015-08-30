'use strict'

window.document.querySelector('.discover-bttn').addEventListener('click', startDiscovery)
window.document.querySelector('.stop-bttn').addEventListener('click', stopDiscovery)

var loader = window.document.querySelector('.loading')
loader.classList.add('hidden')

chrome.bluetooth.onAdapterStateChanged.addListener(function (adapter) { // Not sure why I have to do this
  console.log('adaprter', adapter)
})

var ul = document.createElement('ul')
var container = document.querySelector('.list-container')
var list

container.appendChild(ul)

function startDiscovery () {
  console.log('starting discovery')
  list = []
  ul.innerHTML = ''
  loader.classList.remove('hidden')
  chrome.bluetooth.startDiscovery(function () {
    chrome.bluetooth.onDeviceAdded.addListener(function (item) {
      console.log('item -->', item)
      list.push(item)
    })
  })
}

function stopDiscovery () {
  console.log('stopping discovery')
  chrome.bluetooth.stopDiscovery(function () {
    loader.classList.add('hidden')
    if (list.length) {
      addDeviceList(list)
    }
  })
}

function addDeviceList (list) {
  ul.innerHTML = ''
  for (var device in list) {
    var item = document.createElement('li')
    item.innerText = list[device].name + ' - ' + list[device].address + ' - ' + list[device].type
    ul.appendChild(item)
  }
}
