import { useRouter } from "next/router"

export default function Order() {
  const router = useRouter()
  const id = router.query.id
  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
}