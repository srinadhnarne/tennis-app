import {Route, Routes} from 'react-router-dom'
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Tournaments from './pages/Tournaments';
import TournamentDetails from './pages/TournamentDetails';
import ManageTournament from './pages/manage/ManageTournaments';
import CreateTournament from './pages/manage/CreateTournament';
import ManageSingleTournament from './pages/manage/ManageSingleTournament';
import UpdateMatchScore from './pages/manage/UpdateMatchScore';
import UpdateScores from './pages/manage/UpdateScores';
import UpdateMatches from './pages/manage/UpdateMatches';
import UserDashboard from './pages/user/UserDashboard';
import CreateMatch from './pages/manage/CreateMatch'
import MatchSummary from './pages/MatchSummary';
import AdminRoute from './components/auth/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageAllTournaments from './pages/admin/ManageAllTournaments';
import ManageUsers from './pages/admin/ManageUsers';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/dashboard/user' element={<UserDashboard/>}/>
      <Route path='/tournaments' element={<Tournaments/>}/>
      <Route path='create-tournament' element={<CreateTournament/>}/>
      <Route path='my-tournaments' element={<ManageTournament/>}/>
      <Route path='/manage-tournament/:slug' element={<ManageSingleTournament/>}/>
      <Route path='/tournament-details/:slug' element={<TournamentDetails/>}/>
      <Route path='/match-summary/:id' element={<MatchSummary/>}/>
      <Route path='/create-match/:slug' element={<CreateMatch/>}/>
      <Route path='/update-matches/:slug' element={<UpdateMatches/>}/>
      <Route path='/update-scores/:slug' element={<UpdateScores/>}/>
      <Route path='/matches/edit-score/:slug/:id' element={<UpdateMatchScore/>}/>
      <Route path='/dashboard/admin' element={<AdminRoute/>}>
        <Route path='' element={<AdminDashboard/>}/>
        <Route path='manage-all-tournaments' element={<ManageAllTournaments/>}/>
        <Route path='manage-users' element={<ManageUsers/>}/>
      </Route>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
    </Routes>
  );
}

export default App;
