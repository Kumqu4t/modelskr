import { useSelector } from "react-redux";
import { useQueryFilters } from "../../hooks/useQueryFilters";
import { useFilters } from "../../hooks/useFilters";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import FilterBar from "../../components/FilterBar";
import ModelList from "../../components/ModelList";
import "./AdminPage.css";

function AdminPage() {
	const navigate = useNavigate();
	const {
		selectedTags,
		setSelectedTags,
		gender,
		setGender,
		agency,
		setAgency,
		keyword,
	} = useQueryFilters("/admin");

	const models = useSelector((state) => state.models.models);

	const filteredModels = useFilters(
		models,
		selectedTags,
		keyword,
		gender,
		agency
	);

	// 태그 목록 추출
	const tags = [...new Set(models.flatMap((model) => model.tags))];

	return (
		<div className="admin-page">
			<h1 className="admin-title">관리자 페이지</h1>

			<div className="admin-section">
				<FilterBar
					selectedTags={selectedTags}
					setSelectedTags={setSelectedTags}
					tags={tags}
					gender={gender}
					setGender={setGender}
					agency={agency}
					setAgency={setAgency}
				/>

				<div className="model-list-section">
					<div className="add-button-wrapper">
						<Button type="default" onClick={() => navigate("/admin/create")}>
							+ 모델 추가
						</Button>
					</div>

					<ModelList models={filteredModels} />
				</div>
			</div>
		</div>
	);
}

export default AdminPage;
