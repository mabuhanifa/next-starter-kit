import Layout from "./Layout";

export default function Parent({ children }) {
  return (
    <Layout>
      <div className="flex">
        <div className="w-1/5">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde iusto
          tenetur pariatur eligendi aperiam dicta natus quidem dolor ad at,
          consequuntur excepturi quia fugit expedita nesciunt quae placeat iure
          corporis.
        </div>
        <div className="w-4/5">{children}</div>
      </div>
    </Layout>
  );
}
