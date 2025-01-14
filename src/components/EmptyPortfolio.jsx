import { Button, Empty, Typography } from "antd";

const containerEmptyStyle = {
  minHeight: "calc(100vh - 299px)",
  backgroundColor: "#001529",
};

export default function EmptyPortfolio({ changeDrawer }) {
  return (
    <div style={containerEmptyStyle}>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        styles={{
          image: {
            marginBottom: "30px",
          },
        }}
        description={
          <Typography.Text style={{ color: "#fff" }}>
            Select coin
          </Typography.Text>
        }
      >
        <Button type="primary" onClick={() => changeDrawer(true)}>
          Add Asset
        </Button>
      </Empty>
    </div>
  );
}
