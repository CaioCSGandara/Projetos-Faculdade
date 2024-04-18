package br.edu.puccampinas.bestbuylist

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import br.edu.puccampinas.bestbuylist.databinding.ActivityBuyListBinding
import com.google.android.material.snackbar.Snackbar

class BuyListActivity : AppCompatActivity(), OnDeleteItem{

    // referenciando todas as views por binding.
    private lateinit var binding: ActivityBuyListBinding

    // array list com os itens da lista.
    private lateinit var items: ArrayList<Item>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // setup do layout
        setupViewBinding()

        // ajustando as dimensoes do constraint (Edge to Edge) para versões do android a partir da 19.
        adjustLayoutConstraint()

        // preparando a recycler view
        prepareRecycleView()

        // carregando a lista de itens.
        loadBuyList()
    }

    private fun adjustLayoutConstraint(){
        enableEdgeToEdge()
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }

    private fun setupViewBinding(){
        binding = ActivityBuyListBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }

    private fun prepareRecycleView() {
        binding.rvItems.layoutManager = LinearLayoutManager(this)
        binding.rvItems.setHasFixedSize(true)
    }

    // carregar a lista
    private fun loadBuyList(){

        // vamos criar aqui itens estáticos e mandar para a lista.
        // sua responsabilidade é integrar com o room.
        val i1 = Item(1,"Detergente", false)
        val i2 = Item(2,"Sabão em pó", false)
        val i3 = Item(3,"Picanha", false)
        val i4 = Item(4,"Abóbora", false)

        items = arrayListOf(i1,i2,i3,i4)

        // criar um adaptador e mapear esse adaptador para a lista.
        val itemsAdapter = AdapterListItem(items,this)
        binding.rvItems.adapter = itemsAdapter
    }

    override fun delete(item: Item) {
        // apagar o elemento da lista.
        Snackbar.make(binding.root,"Implementar... ", Snackbar.LENGTH_LONG).show()
    }
}