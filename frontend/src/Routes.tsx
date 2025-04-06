import { FC } from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router';
import { Home, Login, SignUp, Protected, PrivateRoute} from './views';
import { Admin } from './admin';
import { styled } from '@mui/material/styles';

const MyDiv = styled('div')({
  textAlign: 'center',
});

const Header = styled('header')({
  backgroundColor: '#282c34',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'calc(10px + 2vmin)',
  color: 'white',
})

export const Routes: FC = () => {
  return (
    <MyDiv>
        <Header>
            <RouterRoutes>
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/logout"
                    element={<Navigate to="/" />}
                    />
                <PrivateRoute path="/protected" component={Protected} />
                <Route path="/" Component={Home} />
            </RouterRoutes>
        </Header>
    </MyDiv>
  );
};

export default Routes;