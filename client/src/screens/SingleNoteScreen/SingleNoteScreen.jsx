import MainScreen from "../../components/MainScreen"
import { Card, Form, Col, Row } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage"
import { useDispatch, useSelector } from "react-redux"
import { createNoteAction } from "../../actions/noteAction"
import { useHistory } from 'react-router-dom'
import axios from "axios"
import gfm from 'remark-gfm'
import html2pdf from 'html2pdf.js'
import { MDBBadge, MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBCardText, MDBCardTitle } from "mdb-react-ui-kit"

const SingleNoteScreen = ({ match }) => {
  console.log(match)
  // const noteElement = useRef()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState([])
  const [date, setDate] = useState("")
	const { loading, error, success } = useSelector(state => state.noteCreate)
	const { userInfo } = useSelector(state => state.userLogin)

  function createPDF () {
    const myElement = document.getElementById('myElement')
    html2pdf(myElement);
    // return new Promise(async (resolve, reject) => {
    //   console.log('create pdf function executing')
    //   const myElement = document.getElementById('myElement');
    //   const opt = {
    //     margin: 1,
    //     filename: 'my-invoice.pdf',
    //     image: {type: 'jpeg', quality: 0.95},
    //     html2canvas: {scale: 2, useCORS: true},
    //     jsPDF: {unit: 'in', format: 'a4', orientation: 'portrait'}
    //   }
    //   try {
    //     const blob = await window.html2pdf().set(opt).from(myElement).outputPdf('blob', 'my-invoice.pdf');
    //     resolve(blob);
    //   } catch (e) {
    //       reject(e);
    //   }
    // })
  }
  

  useEffect(() => {
    const getData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        }
      }
      const { data } = await axios.get(`/api/notes/${match.params.id}`, config)

      setTitle(data.title)
      setContent(data.content)
      setCategory(data.category)
      setDate(data.createdAt)
    }

    getData()
  }, [match.params.id, userInfo])
 

  return (
    <MainScreen title='View Note'>
      <MDBCard className="mt-3 border-primary shadow" id={'myElement'}>
          <MDBCardHeader>
            <MDBCardTitle>{title}</MDBCardTitle>
          </MDBCardHeader>
          <MDBCardBody>
            {error && <ErrorMessage type="danger">{error}</ErrorMessage>}
            {category.map(cat => <MDBBadge pill color="info mb-3 mx-1">{cat}</MDBBadge>)}
            <MDBCardText >
              <ReactMarkdown remarkPlugins={[gfm]}>{content}</ReactMarkdown>
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter className="text-muted">
            Created on - {date.substring(0, 10)}
          </MDBCardFooter>
      </MDBCard>
      <button onClick={createPDF} className="btn btn-primary mt-3 btn-md">Export as PDF</button>
    </MainScreen>
  )
}

export default SingleNoteScreen