import { FormEvent, useRef } from "react"

type Props = {  
  onSubmit?: ({ name, age }: Person) => Promise<void>
}

type Person = {
  name: string;
  age: string;
}

const Form = ({ onSubmit }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    onSubmit({
      name: nameRef.current?.value,
      age: ageRef.current?.value
    })
  }

  return (
    <form id="formComponent" onSubmit={handleSubmit}>
      <label htmlFor="name">Nome</label>
      <input data-testid="name" id="name" name="name" ref={nameRef}/>

      <label htmlFor="age">Idade</label>
      <input data-testid="age" id="age" name="age" ref={ageRef}/>

      <button type="submit" data-testid="submit">Enviar</button>
    </form>
  )
}

export { Form }
