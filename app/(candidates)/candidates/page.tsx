import { Container } from '@/app/components';
import { CandidateCard } from '@/app/components';

export const mockProfiles = [
  {
    id: 1,
    name: "Cody Fisher",
    role: "Marketing Officer",
    location: "New York",
    experience: "3 Years experience",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    selected: false,
  },
  {
    id: 2,
    name: "Darrell Steward",
    role: "Interaction Designer",
    location: "Los Angeles",
    experience: "5 Years experience",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    selected: false,
  },
  {
    id: 3,
    name: "Guy Hawkins",
    role: "Junior Graphic Designer",
    location: "Chicago",
    experience: "2 Years experience",
    image: "https://randomuser.me/api/portraits/men/30.jpg",
    selected: false,
  },
  {
    id: 4,
    name: "Jane Cooper",
    role: "Senior UX Designer",
    location: "San Francisco",
    experience: "6 Years experience",
    image: "https://randomuser.me/api/portraits/women/40.jpg",
    selected: true, // Highlighted card
  },
  {
    id: 5,
    name: "Theresa Webb",
    role: "Front-End Developer",
    location: "Seattle",
    experience: "4 Years experience",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    selected: false,
  },
];

const Candidates = () => {
  return (
    <Container>
      {
        mockProfiles.map((d) => (
          <CandidateCard key={d.id} {...d} />
        ))
      }
    </Container>
  )
};

export default Candidates;
