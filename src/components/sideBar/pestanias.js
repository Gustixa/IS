import HistoryIcon from '@mui/icons-material/History'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AddIcon from '@mui/icons-material/Add'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import Groups2Icon from '@mui/icons-material/Groups2'
import LocalActivityIcon from '@mui/icons-material/LocalActivity'

// Elementos del sideBar para un administrador
export const adminButtons = {
  'Agregar Estudiante': {
    icon: AddIcon,
    ruta: '/NuevoEstudiante',
  },
  'Consultar Estudiantes': {
    icon: Groups2Icon,
    ruta: '/becarios',
  },
  'Detalles Actividades': {
    icon: CalendarTodayIcon,
    ruta: '/actividadBecario',
  },
  'Actividades Beca': {
    icon: VolunteerActivismIcon,
    ruta: '/actividadesBeca',
  },
}
// Elementos del sideBar para un estudiante
export const studentButtons = {
  'Historial Horas Beca': {
    icon: HistoryIcon,
    ruta: '/registroEstudiante',
  },
  'Actividades beca': {
    icon: CalendarMonthIcon,
    // MODIFICAR LA RUTA, PUES NO SERA LA RUTA RAIN
    ruta: '/actividadesBeca',
  },
  'Actividades incritas': {
    icon: LocalActivityIcon,
    ruta: '/actividadesInscritas',
  },
}
