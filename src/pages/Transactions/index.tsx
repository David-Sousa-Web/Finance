import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from "../../contexts/TransactionsContext"
import { dataFormatter, priceFormatter } from "../../utils/formatter";

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        
        <TransactionsTable>
          <tbody>
            {transactions.map((transactions) => {
              return(
                <tr key={transactions.id}>
                  <td width="50%">{transactions.description}</td>
                  <td>
                    <PriceHighLight variant={transactions.type}>
                      {transactions.type === 'outcome' && '- '}
                      {priceFormatter.format(transactions.price)}
                    </PriceHighLight>
                  </td>
                  <td>{transactions.type}</td>
                  <td>{dataFormatter.format(new Date(transactions.createdAt))}</td>
                </tr>
              )
            })}
            
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>   
  )
}