// Milestone 1
// Partendo dalla seguente struttura dati (allegata sotto) , mostriamo in pagina tutte le icone disponibili
// Milestone 2
// Coloriamo le icone per tipo
// Milestone 3
// Creiamo una select con i tipi di icone e usiamola per filtrare le icone
// Ricordate di dare priorità al JavaScript, gli stili CSS di dettaglio puntuali potete farli una volta completata la logica.

const icons = [
	{
		name: "cat",
		prefix: "fa-",
		type: "animal",
		family: "fas",
	},
	{
		name: "crow",
		prefix: "fa-",
		type: "animal",
		family: "fas",
	},
	{
		name: "dog",
		prefix: "fa-",
		type: "animal",
		family: "fas",
	},
	{
		name: "dove",
		prefix: "fa-",
		type: "animal",
		family: "fas",
	},
	{
		name: "dragon",
		prefix: "fa-",
		type: "animal",
		family: "fas",
	},
	{
		name: "horse",
		prefix: "fa-",
		type: "animal",
		family: "fas",
	},
	{
		name: "hippo",
		prefix: "fa-",
		type: "animal",
		family: "fas",
	},
	{
		name: "fish",
		prefix: "fa-",
		type: "animal",
		family: "fas",
	},
	{
		name: "carrot",
		prefix: "fa-",
		type: "vegetable",
		family: "fas",
	},
	{
		name: "apple-alt",
		prefix: "fa-",
		type: "vegetable",
		family: "fas",
	},
	{
		name: "lemon",
		prefix: "fa-",
		type: "vegetable",
		family: "fas",
	},
	{
		name: "pepper-hot",
		prefix: "fa-",
		type: "vegetable",
		family: "fas",
	},
	{
		name: "user-astronaut",
		prefix: "fa-",
		type: "user",
		family: "fas",
	},
	{
		name: "user-graduate",
		prefix: "fa-",
		type: "user",
		family: "fas",
	},
	{
		name: "user-ninja",
		prefix: "fa-",
		type: "user",
		family: "fas",
	},
	{
		name: "user-secret",
		prefix: "fa-",
		type: "user",
		family: "fas",
	},
];

// Creo un array di colori a mia scelta

const colors = ["#ff8906", "#58a912", "#e53170"];
// 1. Stampare le icone a schermo
console.log(colors);

// Seleziono il container degli elementi che voglio, quì le icone

const container = document.querySelector(".icons");

// invoco la funzione per stampare le icone
// printIcons(icons, container);

// 2. PRINTARE ICONE COLORATE

const coloredIcons = colorIcons(icons, colors);

// invoco la funzione per stampare le icone colorate

printIcons(coloredIcons, container);

// 3. FILTER ITEMS
//A. GENERARE SELECT OPTIONS
// Individuo l'elemento a cui riferirmi
const select = document.querySelector("#type");

// individuo i tipi delle icone colorate
const types = getType(coloredIcons);

// Invoco la funzione per generare le varie opzioni che ho ottenuto dai tipi e iniettati nel select
genOption(types, select);

//B. FILTRAGGIO QUANDO CAMBIA (FILTER ON CHANGE)

select.addEventListener("change", () => {
	// Controllare con log se avviene il filtraggio dietro le quinte
	// console.log("changeD!");

	// Cosa è cambiato? Capiamolo con log
	console.log(select.value);

	// Quindi definisco la variabile "selected",
	// ovvero il value che ha select
	const selected = select.value;

	// creo una variabile per le icone filtrate attraverso la funzione che filtra le icone
	const filteredIcons = filterIcons(coloredIcons, selected);

	// invoco la funzione per stampare le icone filtrate
	printIcons(filteredIcons, container);
});

// *** FUNZIONE PER STAMPARE ICONE A SCHERMO**//
// Dichiaro la funzione per stampare le icone a SCHERMO
function printIcons(icons, container) {
	// Genero markup vuoto dove inserire il container con le ICONE
	let html = "";
	// Ottengo la singola icona

	icons.forEach((icon) => {
		// Decostruisco la singola icona per proprietà
		const { name, prefix, family, color } = icon;
		// Aggiungo la singola icona al markup utilizzando template literal
		// ed ottenendo le proprietà che compongono la classe dell'icona
		// aggiungo anche la proprietà color con destructuring

		html += `
	    <div class="icon p-20">
			<i class="${family} ${prefix}${name}" style="color: ${color}"></i>
			<div class="title">${name}</div>
		</div> 
		`;
	});
	// NON METTO += PERCHè NON VOGLIO AGGIUNGERE QUESTO MARKUP A QUELLO PREESISTENTE
	// VOGLIO SOSTITUIRLO
	container.innerHTML = html;
}

// dichiaro la FUNZIONE PER COLORARE LE icone
// quindi mi servono 2 parametri: le icone e i colori da abbinare

function colorIcons(icons, colors) {
	// In base a cosa coloro le icone?
	// divido le icone per tipo, ogni tipo avrà un colore diverso
	// Mi servirà una funzione che mi restituisca il tipo dell'icona

	const types = getType(icons);
	console.log(types);
	console.log(colors);

	// Dobbiamo assegnare un colore per tipo ad ogni icona
	// Dovremo aggiungere una proprietà colore ad ogni elemento icona
	// Per modificare gli elementi di un array quale metodo usiamo?

	const coloredIcons = icons.map((icon) => {
		// Otteniamo l'indice di ogni type dato che
		// ogni posizione dell'indice avrà un colore diverso
		const indexType = types.indexOf(icon.type);
		console.log(indexType);

		// Ritorno lo stesso array con lo spread operator ma aggiungendo la proprietà color
		// LA proprietà color dovrà riferirsi all'indice
		return {
			...icon,
			color: colors[indexType],
		};
	});
	// Map mi ritorna le icone colorate
	return coloredIcons;
}

// FUNZIONE PER dividere LE icone per TIPO
function getType(icons) {
	// Creo un array vuoto da riempire con i vari tipi
	const types = [];

	// individuo il tipo di ogni icona iterando sul gruppo di icone
	icons.forEach((icon) => {
		// e lo inserisco nell'array vuoto TYPES in caso non ci sia già
		if (!types.includes(icon.type)) {
			types.push(icon.type);
		}
	});

	return types;
	// Voglio che la funzione mi restituisca tutti i tipi indivudati
}

// Funzione per generare opzioni per il filter

function genOption(types, select) {
	// faccio array vuoto di opzioni
	let options = "";

	// itero i tipi
	types.forEach((type) => {
		// aggiungo alle opzioni i tipi
		options += `
        <option value="${type}">${type}</option>
        `;
	});
	// Stavolta uso il più uguale per far sì che l'opzione di default rimanga
	select.innerHTML += options;
}

// FILTER ICONS

// funzione per filtrare le icone selezionate
function filterIcons(icons, selected) {
	// se sono tutte selezionate, le ritorna tutte
	if (selected === "all") {
		return icons;
	}
	// altriemnti, ritorna solo quelle del tipo selezionato
	const filtered = icons.filter((icon) => {
		// return CONDIZIONE
		return icon.type === selected;
	});

	// e quindi ritorna il tipo filtrato o tutte
	return filtered;
}
