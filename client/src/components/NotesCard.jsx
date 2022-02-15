import { Accordion, Button, Card } from "react-bootstrap"

const NotesCard = ({ title, content, category, id }) => {
  const deleteHandler = (id) => {
    if(window.confirm("Are you sure ? ")) {
      // Delete 
    }
  }

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
      <Card className="mt-3 card border-info">
        <Card.Header className="d-flex">

              <span
                style={{
                  flex: 1,
                  cursor: "pointer",
                  fontSize: "25px",
                  alignSelf: "center",
                }}>
                <Accordion.Header>{title}</Accordion.Header>
              </span>
              <div>
                <Button href={`/notes/${id}`} className="btn-success btn-rounded mx-2 btn-sm">Edit</Button>
                <Button className="btn-danger btn-rounded mx-2 btn-sm"
                  onClick={() => deleteHandler(id)}>Delete</Button>
              </div>
            </Card.Header>
              <Accordion.Body>

                <Card.Body>
                  <h5>
                    <span className="badge bg-success">Category - {category}</span>
                  </h5>
                  <blockquote className="blockquote mb-0">
                    <p>
                      {' '}{content}.{' '}
                    </p>
                    <footer className="blockquote-footer">
                      Created on <cite title="Source Title">12/2/2022</cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Body>

      </Card>
        </Accordion.Item>
    </Accordion>
  )
}

export default NotesCard