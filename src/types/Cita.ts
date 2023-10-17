export type Cita = {
  id: number;
  NumTrabajador: string;
  matriculaAlumno: string;
  fecha: string;
  hora: string;
  motivoCita: string;
  discapacidad: boolean;
  comunidadIndigena: boolean;
  migrante: boolean;
};

export type CitaDTO = {
  NumTrabajador: string;
  fecha: string;
  hora: string;
  motivoCita: string;
  discapacidad: boolean;
  comunidadIndigena: boolean;
  migrante: boolean;
};
