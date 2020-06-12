const company = {
    name: "ARCHIHUB CONSTRUCTION COMPANY",
    tagline: "We enhance lifestyle and value to your property",
    box: "P.O. BOX 646-00206",
    email: "archihubconstruction@yahoo.com",
    mobile: "0713810398",
    vision: "Our vision is to turn plots into homes and architectural inspiration into reality, much faster and cost effectively, making housing affordable even to the low and middle income earners, here in Kenya and the entire African continent.",
    mission: "Our Mission is to provide quality, innovative and efficient work, helping our clients to minimize construction risks and maximize construction opportunities in a multicultural business environment at competitive prices. We are well equipped in terms of plant, machinery as well as integrated management, delivering outstanding results in a record time of all our assignments.",
    objective: "Our objective is to provide quality services to our clients efficiently and to their satisfaction. In order to ensure this, we have a team of qualified and experienced staff who are committed to meeting the needs of our clients.",
    logo: "logo.jpg",
    values: "",
    incorporation_date: "19th February 2016"
};
const coreValues = ['Honest','Efficient','Reliable','Dependable','Integrity','Committed','Accountable','Professionalism']
const philosophies = ['Create detailed schedules to meet client’s project objective.', 'Communicate clearly and timely with all project stakeholders.', 'Track project progress and fine-tune deviations.', 'Supervise and inspect closely to ensure quality of work done.']
const projects = [
    {
        location:"none",
        client:"none",
        duration:'none',
        year:2020,
    },
    {
        location:'Kipeto',
        cost: 9,
        client:'Moses Semenkur ',
        duration:'8 months',
        year: 2014
    }, 
    {
        location:'Matasia',
        cost: 18,
        client:'Mrs. Grace Senteu',
        duration:'18 months',
        year:'2015'
    }, 
    {
        location:'Kiserian-Triangle',
        cost:7.2,
        client:'Mr. Michael Ndunyu',
        duration:'6 months',
        year:'2011'
    }, 
    {
        location:'Kitengela',
        cost: 12,
        client:'Mr. Peter M. Kamau',
        duration:'12 months',
        year:2017
    }, 
    {
        location:'Ngong -Kibiko',
        cost: 18,
        client:'Mr. Nicholas',
        duration:'12 months',
        year: 2016
    }, 
    {
        location:'Kiserian-Triangle',
        cost: 30,
        client:'Ms Peris',
        duration:'12 months',
        year:2014
    }, 
    {
        location:'Nkoroi',
        cost: 25,
        client:'Surbubia Homes Ltd.',
        duration:'12 months',
        year:2017
    }, 
    {
        location:'Kitengela',
        cost: 110,
        client:'Homekena Ltd.',
        duration:'24 months',
        year:2018
    }, 
    {
        location:'Kiambu',
        cost: 28,
        client:'Ms. K. Ngethe',
        duration:'24 months',
        year:2018
    }, 
    {
        location:'Riruta – Satellite ',
        cost: 36,
        client:'Mr. N.M',
        duration:'12 months',
        year:2017
    }, 
]
const users =[
    {
        username:"amshel",
        email:"amshelhack3r@gmail.com",
        password:'blowme'
    },
    {
        username:"patrick",
        email:"patrick@gmail.com",
        password:'blowme'
    }
]


const data = {
    company,
    coreValues,
    philosophies,
    projects,
    users
}


module.exports = data;