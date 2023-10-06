import express from 'express';
import { protect , isAdmin } from '../middleware/authMiddleware.js';
import { 
    authUser, 
    registerUser,
    logOutUser,
    getUserProfile,
    updateUserProfile, 
    getAllMembers,
    AddMember,
    deleteUser,
    getMember,
    editMember,
    suspendMember,
    
    
} from '../controllers/controller.js';


const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout',logOutUser);
router.route('/profile').get(protect, getUserProfile).put(protect ,updateUserProfile);
router.post('/add', AddMember);

// Admin-specific routes protected by isAdmin middleware
router.route('/members').get(protect, isAdmin, getAllMembers);
router.delete('/:id',deleteUser);
router.route('/:id').get(getMember).put(editMember);
router.patch('/:id',suspendMember);


export default router;
