import { Charter } from '@/components/custom/ChartData'
import StateGrid from '@/components/custom/StateGrid'
import React from 'react'

const data = [
  { title: 'Total des parieurs', value: '2', description: 'Nombre total de parieurs enregistrés.', route: '/admin/bettors' },
  { title: 'Parieurs actifs', value: '2', description: 'parieurs ayant deja fait un depot.', route: '/parieurs-actifs' },
  { title: 'Parieurs non vérifiés par email', value: '0', description: 'Parieurs qui n\'ont pas vérifié leur email.', route: '/parieurs-non-verifies-email' },
  { title: 'Parieurs non vérifiés par mobile', value: '0', description: 'Parieurs qui n\'ont pas vérifié leur mobile.', route: '/parieurs-non-verifies-mobile' },
  { title: 'Paris en attente', value: '0', description: 'Nombre total de paris en attente de validation.', route: '/paris-en-attente' },
  { title: 'Dépôts en attente', value: '0', description: 'Dépôts en attente de traitement.', route: '/depots-en-attente' },
  { title: 'Retraits en attente', value: '0', description: 'Retraits en attente de traitement.', route: '/retraits-en-attente' },
  { title: 'Tickets en attente', value: '0', description: 'Tickets en attente de traitement.', route: '/tickets-en-attente' },
  { title: 'Total des dépôts', value: '$1,050.00', description: 'Montant total des dépôts effectués.', route: '/total-depots' },
  { title: 'Frais de dépôt', value: '$1,300.00', description: 'Frais totaux associés aux dépôts.', route: '/frais-de-depot' },
  { title: 'Total des retraits', value: '$0.00', description: 'Montant total des retraits effectués.', route: '/total-retraits' },
  { title: 'Frais de retrait', value: '$0.00', description: 'Frais totaux associés aux retraits.', route: '/frais-de-retrait' },
];

const page = () => {
  return (
    <div>
      <StateGrid data={data} />
      <Charter />
    </div>
  )
}

export default page