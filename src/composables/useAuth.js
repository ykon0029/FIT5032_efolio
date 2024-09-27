import { ref, onMounted } from "vue"
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import { useRouter } from "vue-router"

export function useAuth() {
  const isAuthenticated = ref(false)
  const auth = getAuth()
  const db = getFirestore()
  const router = useRouter()

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isAuthenticated.value = true;
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        isAuthenticated.value = false;
        localStorage.removeItem('isAuthenticated');
      }
    });
  });

  const signin = async (email, password, selectedRole) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const userDoc = await getDoc(doc(db, 'role', userCredential.user.uid))
      
      if (userDoc.exists()) {
        const userRole = userDoc.data().role
        
        if (userRole === selectedRole) {
          console.log("Firebase Sign In Successful!")
          console.log("User Role:", userRole) 
          localStorage.setItem('isAuthenticated', 'true')
          router.push("/")
          console.log(auth.currentUser)
        } else {
          throw new Error("Selected role does not match your assigned role.")
        }
      } else {
        throw new Error("User role not found.")
      }
    } catch (error) {
      console.error("Sign in error:", error.message)
      return error.message
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      isAuthenticated.value = false;
      localStorage.removeItem('isAuthenticated');
      router.push('/FireLogin');
      console.log("Firebase Sign out Successful!");
      console.log(auth.currentUser);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    isAuthenticated,
    signin,
    logout
  }
}