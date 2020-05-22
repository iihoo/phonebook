import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/groups'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const getOne = id => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const addPersonToGroup = (groupId, personObject) => {
  const request = axios.put(`${baseUrl}/addpersons/${groupId}`, personObject)
  return request.then(response => response.data)
}

const removePersonFromGroup = (groupId, personObject) => {
  const request = axios.put(`${baseUrl}/removepersons/${groupId}`, personObject)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deleteObject = id => {
  axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, getOne, addPersonToGroup, removePersonFromGroup, create, deleteObject, update }