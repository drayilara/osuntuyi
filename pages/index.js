import db from "@/firebase";
import { Table, Tag, Divider } from "antd";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import CreateForm from "@/components/createForm";
import EditForm from "@/components/update"

export default function Inpatients() {
  const [data, setData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editRecord, setEditRecord] = useState(undefined);

   const openModal = () => {
     setModalOpen(true);
   };

   const closeModal = () => {
     setModalOpen(false);
   };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    },
    {
      title: "Clinical state",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        if(status === "stable") color = "blue"
        if(status === "improving") color = "pink"
        if(status === "critical") color = "red"  
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
    },
    {
      title: "Admission date",
      dataIndex: "admissionDate",
      key: "admission",
    },
    {
      title: "Working diagnosis",
      dataIndex: "diagnosis",
      key: "diagnosis",
    },
    {
      title: "Duration Of Stay",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Last seen by",
      dataIndex: "lastSeen",
      key: "lastSeen",
    },
    {
      title: "Actions",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => {
        return <span>
          <a onClick={() => {
            setShowEdit(true);
            setEditRecord(record);
          }}>Edit</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
        
      },
    },
  ];

  useEffect(() => {
    async function getAllPatients() {
      const querySnapshot = await getDocs(collection(db, "patients"));
      const allPatients = querySnapshot.docs.map((doc) => {
        const patient = doc.data();
        return {
          id: doc.id,
          name: patient.name,
          admissionDate: patient.admissionDate,
          age: patient.age,
          diagnosis: patient.diagnosis,
          insurance: patient.insurance,
          lastSeen: patient.lastSeen,
          hospitalNumber: patient.hospitalNumber,
          status: patient.status,
        };
      });

      setData(allPatients);
    }

    getAllPatients();
  }, []);
  return (
    <content>
      <nav>Osuntuyi Medical Center</nav>
      <main className="p-12">
        <h3>Hello</h3>



        <div>
         {!showAdd &&
          <button
            onClick={() => setShowAdd(true)}
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Add a patient
          </button>

        }
          <Table columns={columns} dataSource={data} />
        </div>
        
        {showAdd && !showEdit && <CreateForm setShowAdd={setShowAdd}/>}
        {!showAdd && showEdit && <EditForm setShowEdit={setShowEdit} editRecord={editRecord}/>}
      
      </main>
    </content>
  );
}
