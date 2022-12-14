import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getPosts, deletePost, getPost } from '../services/lib/postApi';
import { CreatePost } from './CreatePost';
import { EditPost } from './EditPost';
import { ViewPost } from './ViewPost';
import { fetchPost } from './utils';
// import Pagination from './Pagination';


const theme = createTheme();

export const Post = () => {
    const [posts, setPosts] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openView, setOpenView] = React.useState(false);
    const [editData, setEditData] = React.useState({});
    // const [currentPage, setCurrentPage] = React.useState(1);
    // const [postPerPage, setPostPerPage] = React.useState(10);
    React.useEffect(() => { 
        getPosts().then(data => {
            setPosts(data.data.posts)
        }).catch(err => {
            console.log(err)
        })
    },[])

    // const indexOfLastPost = currentPage * postPerPage;
    // const indexOfFirstPost = indexOfLastPost - postPerPage;
    // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const getPostFunction = () => {
      
    }

    const deleteCurrentPost =async (id) => {
        deletePost(id).then(data => {
            let deletedPost = data.data;
            setPosts(posts.filter(post => {
                return post.id !== deletedPost.id;
            }))
        }).catch(err => {
            console.log(err.response.data.message)
            if(err.response.data.message === "Post with id 'undefined' not found"){
                setPosts(posts.filter(post => {
                    return post.id !== id;
                }))
            }
        })
    }

  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);

    const handleEdit = async(id) => {
      const {response} = await fetchPost(id) 
      if(response.status === 200) {
        setEditData(response.data)
        handleOpenEdit();
      }
      if(response === "Post with id 'undefined' not found"){
        posts.filter(post => {
          if(post.id == id) {
              setEditData(post)
              handleOpenEdit();
          }
          })
        }
    }

    const handleView = async(id) => {
      const {response} = await fetchPost(id) 
      if(response.status === 200) {
        setEditData(response.data)
        handleOpenView();
      }
      if(response === "Post with id 'undefined' not found"){
        posts.filter(post => {
          if(post.id == id) {
              setEditData(post)
              handleOpenView();
          }
          })
        }
    }
    


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Posts
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={handleOpen}>Create a new post</Button>
              {open && (
                <CreatePost open={open} handleClose={handleClose} setPosts={setPosts} posts={posts}/>
              )}
              {openEdit && (
                <EditPost open={openEdit} handleClose={handleCloseEdit} setPosts={setPosts} posts={posts} editData={editData}/>
              )}
              {openView && (
                <ViewPost open={openView} handleClose={handleCloseView} setPosts={setPosts} posts={posts} editData={editData}/>
              )}
              {/* <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title}
                    </Typography>
                    <Typography>
                      {post.body}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleView(post.id)}>View</Button>
                    <Button size="small" onClick={() => handleEdit(post.id)}>Edit</Button>
                    <Button size="small" onClick={() => deleteCurrentPost(post.id)}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}