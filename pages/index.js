import db from "@/firebase";
import { Table, Tag, Divider } from "antd";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import CreateForm from "@/components/createForm";
import EditForm from "@/components/update"
import formatDate from "@/utils/formatDate";
import calculateDateDifferenceInSeconds from "@/utils/dateDifference";
import {BsPlus} from "react-icons/bs"

export default function Inpatients() {
  const [data, setData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editRecord, setEditRecord] = useState(undefined);


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "400px",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Hospital Number",
      dataIndex: "hospitalNumber",
      key: "hospitalNumber",
      width: "300px",
    },
    {
      title: "Clinical state",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        if (status === "STABLE") color = "green";
        if (status === "IMPROVING") color = "blue";
        if (status === "CRITICAL") color = "red";
        return (
          <span>
            <Tag color={color} key={status}>
              {status}
            </Tag>
          </span>
        );
      },
    },
    {
      title: "Insurance",
      dataIndex: "insurance",
      key: "insurance",
      width: "300px",
    },
    {
      title: "Admission date",
      dataIndex: "admissionDate",
      key: "admissionDate",
      width: "300px",
    },
    {
      title: "Working diagnosis",
      dataIndex: "diagnosis",
      key: "diagnosis",
      width: "300px",
    },
    {
      title: "Duration Of Stay",
      dataIndex: "duration",
      key: "duration",
      width: "300px",
    },
    {
      title: "Last seen by",
      dataIndex: "lastSeen",
      key: "lastSeen",
      width: "300px",
    },
    {
      title: "Actions",
      dataIndex: "delete",
      width: "300px",
      key: "delete",
      render: (_, record) => {
        return (
          <span>
            <a
              className="text-[blue]"
              onClick={() => {
                setShowEdit(true);
                setEditRecord(record);
              }}
            >
              Edit
            </a>
            <Divider type="vertical" />
            <a
              className="text-[red]"
              onClick={() => {
                deletePatient(record.id);
              }}
            >
              Delete
            </a>
          </span>
        );
      },
    },
  ];

  async function deletePatient(patientId) {
      await deleteDoc(doc(db, "patients", patientId));
      await getAllPatients();
    alert("Patient deleted");
  }

  async function getAllPatients() {
      const querySnapshot = await getDocs(collection(db, "patients"));
      const allPatients = querySnapshot.docs.map((doc) => {
        const patient = doc.data();
        const date = formatDate(patient.admissionDate.seconds);
        const daysOnAdmission = calculateDateDifferenceInSeconds(patient.admissionDate.seconds)
        return {
          id: doc.id,
          name: patient.name.toUpperCase(),
          admissionDate: date,
          age: patient.age,
          diagnosis: patient.diagnosis.toUpperCase(),
          insurance: patient.insurance.toUpperCase(),
          lastSeen: patient.lastSeen.toUpperCase(),
          hospitalNumber: patient.hospitalNumber,
          status: patient.status.toUpperCase(),
          duration: daysOnAdmission,
        };
      });

      setData(allPatients);
    }

  useEffect(() => {
    getAllPatients();
  }, []);
  return (
    <content>
      <nav className="p-6 bg-blue-600">
        <h3 className="text-2xl text-white font-medium">
          Osuntuyi Medical Center
        </h3>
      </nav>
      <main className="p-12">
        <div className="overflow-x-scroll">
          <h3 className="text-2xl font-medium py-4">Inpatient Tracking</h3>
          <Table columns={columns} dataSource={data} />
          {!showAdd && !showEdit && (
            <button
              onClick={() => setShowAdd(true)}
              type="button"
              className="bg-blue-500 mb-4 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Add a patient
            </button>
          )}
        </div>

        {showAdd && !showEdit && (
          <CreateForm setShowAdd={setShowAdd} getAllPatients={getAllPatients} />
        )}
        {!showAdd && showEdit && (
          <EditForm
            setShowEdit={setShowEdit}
            editRecord={editRecord}
            getAllPatients={getAllPatients}
          />
        )}
      </main>

      <footer className="text-center font-medium mb-2 p-2">
        Created with ❤️ by{" "}
        <a href="mailto:ayilarasodiq1@gmail.com" className="text-blue-600">
          Dr. Ayilara
        </a>
      </footer>
    </content>
  );
}
