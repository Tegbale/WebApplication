import classroom from "@/api/schooladmin/classroom.js";
import guardian from "@/api/schooladmin/guardian.js";
import student from "@/api/schooladmin/student.js";
import teacher from "@/api/schooladmin/teacher.js";
import dashboard from "@/api/schooladmin/dashboard.js";

const schoolAdmin = {
  dashboard,
  classroom,
  guardian,
  student,
  teacher,
};

export default schoolAdmin;
