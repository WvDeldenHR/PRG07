import { StatusBar } from 'expo-status-bar';
// Views
import { Navbar } from './components/nav/Navbar';
// Components
import { ThemeProvider } from './components/layout/ThemeContext';


export default function App() {
  return (
    <>
        <ThemeProvider>
            <Navbar />
            <StatusBar style="auto" />
        </ThemeProvider>
    </>
  );
}