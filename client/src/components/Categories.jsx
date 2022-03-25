import { Button, Row, Col, Container } from "react-bootstrap"
import { MDBBadge } from 'mdb-react-ui-kit'
import { useState, useEffect } from "react"
import axios from 'axios'
import {useSelector} from 'react-redux'

const Categories = () => {

    const [tags, setTags] = useState()
	const { userInfo } = useSelector(state => state.userLogin)

    // const tags = ["Tech", "Work", "learn", "School", "coding", "HTML5", "Computer Science"]
    useEffect(() => {
        let isMounted = true;
        const fetchTags = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
                }
            const { data } = await axios.get('/api/notes/tags', config)
            // console.log(data.uniqueTags)
            if(isMounted)
                setTags(data.uniqueTags)
        }

        fetchTags()
        return () => { isMounted = false }
    }, [userInfo])
    return (
        <Container>
            <Row>
                <Col>
                    {tags?.map((tag) => (<MDBBadge pill color="primary mb-3 mx-1">{tag}</MDBBadge>))}
                </Col>
            </Row>
        </Container>
    )
}

export default Categories