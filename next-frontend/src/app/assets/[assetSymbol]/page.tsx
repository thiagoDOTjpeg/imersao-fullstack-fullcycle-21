import { AssetShow } from "@/components/AssetShow";
import { ChartComponent } from "@/components/ChartComponent";
import { OrderForm } from "@/components/OrderForm";
import { OrderType } from "@/models";
import { Card, TabItem, Tabs } from "flowbite-react";
import { AssetChartComponent } from "./AssetChartComponent";
import { getAsset, getMyWallet } from "../../queries/queries";
import { WalletList } from "@/components/WalletList";

export default async function AssetDashboard({
  params,
  searchParams,
}: {
  params: Promise<{ assetSymbol: string }>;
  searchParams: Promise<{ walletId: string }>;
}) {
  const { assetSymbol } = await params;

  const { walletId } = await searchParams;

  if (!walletId) {
    return <WalletList />;
  }

  const wallet = await getMyWallet(walletId);

  if (!wallet) {
    return <WalletList />;
  }

  const asset = await getAsset(assetSymbol);
  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <div className="flex flex-col space-y-2 ">
        <AssetShow asset={asset} />
        <div className="ml-2 font-bold text-2xl">R$ {asset.price}</div>
      </div>
      <div className="grid grid-cols-5 flex-grow gap-2">
        <div className="col-span-2">
          <Card>
            <Tabs>
              <TabItem
                active
                title={<div className="text-blue-700">Comprar</div>}
              >
                <OrderForm
                  asset={asset}
                  walletId={walletId}
                  type={OrderType.BUY}
                />
              </TabItem>
              <TabItem title={<div className="text-red-700">Venda</div>}>
                <OrderForm
                  asset={asset}
                  walletId={walletId}
                  type={OrderType.SELL}
                />
              </TabItem>
            </Tabs>
          </Card>
        </div>
        <div className="col-span-3 flex flex-grow">
          <AssetChartComponent asset={asset} />
        </div>
      </div>
    </div>
  );
}
