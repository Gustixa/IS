import HistoryIcon from '@mui/icons-material/History'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AddIcon from '@mui/icons-material/Add'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import SummarizeIcon from '@mui/icons-material/Summarize'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import Groups2Icon from '@mui/icons-material/Groups2'

// Elementos del sideBar para un administrador
export const adminButtons = {
    'Agregar Estudiante':{
      icon: AddIcon,
      ruta: '/NuevoEstudiante'
    },
    'Consultar Estudiantes':{
      icon: Groups2Icon,
      ruta: '/becarios'
    },
    'Detalles Actividades': {
      icon: CalendarTodayIcon,
      ruta: '/actividadBecario'
    },
    'Actividades Beca':{
      icon: VolunteerActivismIcon,
      ruta: '/actividadesBeca'
    }  
  }
  // Elementos del sideBar para un estudiante
  export const studentButtons = {
    'Historial Horas Beca': {
      icon: HistoryIcon,
      ruta:'/registroEstudiante'
    },
    'Actividades beca':{
      icon:CalendarMonthIcon,
      // MODIFICAR LA RUTA, PUES NO SERA LA RUTA RAIN 
      ruta: '/nuevaActividadBeca'
    }
  }

