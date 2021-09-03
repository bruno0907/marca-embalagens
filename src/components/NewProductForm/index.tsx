type NewProductFormProps = {
  onClose: () => void;
}

const NewProductForm = ({ onClose }: NewProductFormProps) => {
  return (
    <>
    <h1>Novo produto</h1>
    <button onClick={onClose}></button>
    </>
  )
}

export { NewProductForm }
