import React, { useEffect, useState } from 'react'
import { Dados } from './styles'
import api from '../../services/api'

interface Cadastro {
  id: string;
  nomeevento: string;
  local: string;
  diasemana: string;
  horario: string;
}

const Dashboard: React.FC = () => {
  const [eventos, setEventos] = useState<Cadastro[]>([])
  let like = 0
  let deslike = 0

  async function AddEventos(event: any) {
    event.preventDefault()

    const { target: form } = event

    const novoCadastro = {
      id: form.id.value,
      nomeevento: form.nomeevento.value,
      local: form.local.value,
      diasemana: form.diasemana.value,
      horario: form.horario.value,
    }

    await api.post('/events', novoCadastro)

    setEventos([...eventos, novoCadastro])

    form.reset()
  }

  useEffect(() => {
    ListarEventos()
  }, [])

  async function ListarEventos() {
    const ListEventos = await api.get('/events')
    setEventos(ListEventos.data)
  }

  async function DeleteEventos(id: string) {
    await api.delete(`/events/${id}`)
    alert('Dados excluidos com sucesso!!')
    setEventos(eventos.filter(event => event.id !== id))
  }

  async function LikeDeslike(like: number, deslike: number) {
    if(like){
      like = like + 1
    }
    if(deslike){
      deslike = deslike + 1
    }
  }

  return (
      <Dados onSubmit={AddEventos}>
        <input type='text' name='nomeevento' placeholder='Evento' />
        <input type='text' name='local' placeholder='Local' />
        <input type='text' name='diasemana' placeholder='Dia da semana' />
        <input type='text' name='horario' placeholder='Horário' />
        <button type='submit'>Enviar</button>
        <ul>
          {eventos.map((event, index) =>
            <li key={index.toString()}>
              <h2>{event.nomeevento} - {event.local}</h2>
              <span>Evento: {event.nomeevento}</span>
              <span>Local: {event.local}</span>
              <span>Dia da semana: {event.diasemana}</span>
              <span>Horário: {event.horario}</span>
              <a href='/'><button type="button" onClick={() => DeleteEventos(event.id)}>Excluir</button></a>
              <button type="button" name='like' onClick={() => LikeDeslike}>Like - {like}</button>
              <button type="button" name='deslike' onClick={() => LikeDeslike}>Deslike - {deslike}</button>
            </li>
          )}
        </ul>
      </Dados>
  )
}

export default Dashboard
