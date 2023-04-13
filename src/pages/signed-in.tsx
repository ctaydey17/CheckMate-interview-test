import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useState } from "react"

export default function SignedIn({ joke }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [modal, setModal] = useState<boolean>(false)
  return (
    <div>
      <h1>Signed In</h1>
      {/* Task 3: Your own presentation of the joke here (Free Style 😉 )*/}
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{joke.type}</Card.Title>
          <Card.Text>
            {joke.setup}
          </Card.Text>
          <Button variant="primary"
            onClick={() => { setModal(true) }}>Answer</Button>
        </Card.Body>
      </Card>
      {modal && <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>{joke.setup}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{joke.punchline}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={() => { setModal(false) }}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>}
      {/* End of Task 3 */}
    </div>
  )

}

// Task 2: Fetch random jokes from the API
// https://official-joke-api.appspot.com/jokes/programming/random
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API and pass it to the page via props.joke
  const res = await fetch(`https://official-joke-api.appspot.com/jokes/programming/random`)
  const data = await res.json()

  // Pass data to the page via props
  // console.log(data[0])
  return {
    props: {
      joke: {
        type: data[0].type,
        setup: data[0].setup,
        punchline: data[0].punchline,
        id: data[0].id
      },
    }, // will be passed to the page component as props
  }
}